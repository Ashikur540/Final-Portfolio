
const Footer = () => {

    const copyToClipboard = () => {
        navigator.clipboard.writeText("meashik1000@gmail.com");
        alert("KSDHJHj")
    }
    const Mailto = ({ email, subject, body, children }) => {
        return (
            <a href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
        );
    };
    return (
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <h1 className="text-xl md:text-[52px] font-semibold text-center my-8 text-white md:text-left md:leading-[4.25rem] w-full">Therefore,</h1>
            <h3 className="text-3xl md:text-4xl py-6 leading-snug font-semibold text-para">I appreciate you coming by. I believe there should be constant learning and development. As a result, I'm currently searching to join a new team of professionals so that I may bring my significant design experience to bear on genuine business problems. Give me a call or shoot me an &nbsp;

                <a href="mailto:meashik1000@gmail.com" onClick={copyToClipboard}
                    className="cursor-pointer font-bold text-2xl md:text-4xl text-transparent  bg-clip-text bg-gradient-to-r from-purple-300 to-sky-400">
                    email
                </a>&nbsp;
                if you believe we would be a good fit.
                &#129309;</h3>
        </div>
    );
};

export default Footer;