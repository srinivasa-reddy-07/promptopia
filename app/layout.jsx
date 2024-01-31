import Navbar from '@/components/Navbar'
import './globals.css'
import Provider from '@/components/Provider'

export const metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts"
}

const MainLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default MainLayout