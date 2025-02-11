import { useSelector } from "react-redux"
import { Layout } from "../layout/Layout"
import { RootState } from "../store";


export const ChatPage = () => {

  const { name } = useSelector((state : RootState) => state.auth);

  return (
    <Layout>
      <div>{`Hola ${name}`}</div>
    </Layout>
  )
}