import { useAppSelector } from "app/hooks";

const { token } = useAppSelector((state) => state.auth);
const tokenAuth = token

export { tokenAuth };
