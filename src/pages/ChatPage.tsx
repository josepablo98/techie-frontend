import { ChatBox } from "../components"
import { ChatBoxProps } from "../interfaces"
import { Layout } from "../layout/Layout"


export const ChatPage = ({ context } : ChatBoxProps) => {

  return (
    <Layout>
      <ChatBox context={context}/>
    </Layout>
  )
}