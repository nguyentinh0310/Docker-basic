import { Route } from '@core/interfaces';
import express from 'express';
const mongoose = require('mongoose');
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import http from 'http';
import socketIo from 'socket.io';
import { Logger } from '@core/utils';
import { errorMiddleware } from '@core/middlewares';

class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;
  public server: http.Server;
  public io: socketIo.Server;

  constructor(routes: Route[]) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server);
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV == 'production' ? true : false;

    this.connectDatabase();
    this.initiallizeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorMiddleware();
    this.initSocketIo();
  }
  private initSocketIo() {
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server, {
      cors: {
        origin: '*',
      },
    });
    this.app.set('socketio', this.io);

    const users: any = {};
    this.io.on('connection', (socket: socketIo.Socket) => {
      Logger.warn('a user connected : ' + socket.id);
      socket.emit('message', 'Hello ' + socket.id);

      socket.on('login', function (data) {
        Logger.warn('a user ' + data.userId + ' connected');
        // saving userId to object with socket ID
        users[socket.id] = data.userId;
      });

      socket.on('disconnect', function () {
        Logger.warn('user ' + users[socket.id] + ' disconnected');
        // remove saved socket from users object
        delete users[socket.id];
        Logger.warn('socket disconnected : ' + socket.id);
      });
    });
  }
  public listen() {
    this.server.listen(this.port, () => {
      Logger.info(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initiallizeMiddleware() {
    if (this.production) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      // this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
      this.app.use(cors({ origin: true, credentials: true }));

    } else {
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
  private connectDatabase() {
    const connectString = process.env.MONGODB_URI;
    if (!connectString) {
      Logger.error('Connection string is invalid');
      return;
    }
    mongoose.connect(
      connectString,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err: any) => {
        if (err) {
          Logger.error('Can not to mongodb!');
          Logger.error(err);
        } else {
          Logger.info('Connected to MongoDB');
        }
      },
    );
  }
}

export default App;
