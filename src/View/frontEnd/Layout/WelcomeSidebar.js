const WelcomeSidebar = () => {
    return (
        <div className="col-lg-6">
            <div className="chat-wrapper">
                <div className="row">
                    <div className="col-xl-8 offset-xl-2">
                        <h2>Welcome to Donorport</h2>
                        <div className="chart-comment-block">
                            <div className="from-me">
                                <p>Have you made a Donorport account yet?</p>
                            </div>
                            <div className="clear"></div>
                            <div className="from-them">
                                <p>What's Donorport?</p>
                            </div>
                            <div className="clear"></div>
                            <div className="from-me">
                                <p><span >😤</span> It's like GoFundMe but for non-profits</p>
                            </div>
                            <div className="clear"></div>
                            <div className="from-them">
                                <p>How does it work? 😇</p>
                            </div>
                            <div className="clear"></div>
                            <div className="from-me">
                                <p>You pay for things non-profits need instead of just giving them money</p>
                            </div>
                            <div className="clear"></div>
                            <div className="from-them">
                                <p>Now that's cool 😎</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat-info-wrap">
                    <i className="bi bi-info-circle"></i> <span>For information on how Donorport works <a href="/about"> click
                        here.</a></span>
                </div>
            </div>
        </div>
    )
}
export default WelcomeSidebar