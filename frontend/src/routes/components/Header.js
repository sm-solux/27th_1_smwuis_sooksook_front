import "../../css/login.css";
const Header = ({ text }) => {
    return (
        <section className="header">
            <div
                style={{
                    borderBottom: "medium solid #aaa",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px"
                }}
            >
                <span style={{ background: "rgb(245, 242, 242)", padding: "0 10px" }}>{text}</span>
            </div>
        </section >
    );
};

export default Header; 