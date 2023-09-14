import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metdata = {
    title : 'promotopia',
    description  : "Discover & Share AI propmts"
}

const RootLayout = ({children})=>{
    return(
        <html>
            <body>
                <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className = "app">
                    <Nav />
                    {children}
                </main>
                </Provider>
               
            </body>
        </html>
    )
}

export default RootLayout 