# Bắt đầu với docker-compose(dev):
- `docker-compose -f docker-compose.dev.yml up --build`
# Bắt đầu với docker-compose(prod):
- `docker-compose -f docker-compose.prod.yml up --build`


# I. Các lệnh thường được sử dụng trong docker:
  1. Xây dựng một image.    
    - `docker build -t "image-name" .`     
    - `docker build -f "Dockerfile.dev" -t "image-name" .`

    + example: docker build -f Dockerfile.dev -t nguyentinh0310/rest-api:v1 .       

  2. Chạy một container.      
    - `docker run -it --rm --name "container-name" -p 5000:5000 "image-name"`     
    - `docker run -it -d --rm --name "container-name" -p 5000:5000 "image-name"`   
    - `docker run -it --rm --name "container-name" --env-file .env -p 5000:5000 "image-name"`

    -it: Ctrl + C (dừng docker)
    --rm: Khi dừng lại đồng thời xóa container
    --name: xét tên container
    -p: port (cổng)
    -d: detach -> chạy một container trong background.     

    + example: docker run -it --rm --name rest-api --env-file .env -p 5000:5000 nguyentinh0310/rest-api:v1

  3. Dừng một container.      
    - `docker stop "container-name"`       

  4. Dừng chạy tất cả containers.      
    - `docker stop $(docker ps -a -q)`      

  5. Hiển thị tất cả images.  
    - `docker images`     

  6. Xóa một image.  
    - `docker rmi "image-id|image-name"`  

  7. Xóa tất cả images.  
    - `docker rmi $(docker images -q)`  

  8. Xóa tất cả <none> images.  
    - `docker rmi $(docker images -f dangling=true -q)` 

  9. Hiển thị tất cả containers đang chạy.         
    - `docker ps`  

  10. Hiển thị tất cả containers.         
    - `docker ps -a`  

  11. Xóa một điểm dừng container.         
    - `docker rm "container-name"`  

  12. Xóa tất cả điểm dừng containers.         
    - `docker rm $(docker ps -a -q)`  

  13. Kill tất cả containers đang chạy.         
    - `docker kill $(docker ps -q)`  

  14. Liệt kê volumes.         
    - `docker volume ls`

  15. Xóa tất cả local volumes không sử dụng.         
    - `docker volume prune`

  16. Xóa một hoặc nhiều volumes.         
    - `docker volume rm "volume-name"`

  17. Chạy commands trong một docker container.         
    - `docker exec -it "container-name" sh`

  18. Push image lên docker hub.         
    - `docker push "image-name:tag"`

  19. Pull image từ docker hub.         
    - `docker pull "image-name:tag"`


### II. Setup gitlab-runner:  
  1. Download the binary for your system   
    - `sudo curl -L --output /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64`  

  2. Cấp cho nó quyền để thực thi       
    - `sudo chmod +x /usr/local/bin/gitlab-runner`        
             
  3. Tạo người dùng GitLab CI  
    - `sudo useradd --comment 'GitLab Runner' --create-home gitlab-runner --shell /bin/bash`      

  4. Cài đặt và chạy dưới dạng service
    - `sudo gitlab-runner install --user=gitlab-runner --working-directory=/home/gitlab-runner`          
    - `sudo gitlab-runner start`          

  5. Register a runner   
    - `sudo gitlab-runner register --url https://gitlab.com/ --registration-token "registration_token"`  

  6. Thêm gitlab-runner vào docker group       
    - `sudo usermod -aG docker gitlab-runner`     
  
  7. Cấp quyền sudo cho người dùng gitlab-runner              
    - `sudo nano /etc/sudoers`        
    - `gitlab-runner ALL=(ALL) NOPASSWD: ALL`      

  8. Fix bug.             
    - `sudo nano /home/gitlab-runner/.bash_logout`        
