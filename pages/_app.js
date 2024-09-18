import '../styles/globals.css';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor'; // Import the CustomCursor component

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CustomCursor /> {/* Add the CustomCursor component here */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
