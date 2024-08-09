import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import '../css/home.css'


const Home = () => {
    const { currBalance } = useContext(Context);

    return (
        <div className="home-container">
            <div>
                <h2>Welcome Back, User</h2>
                <p>
                    We’re glad to see you again! Your financial well-being is our priority, and we're here to help you stay on track with your budget.
                </p>
            </div>

            <div className="account-snapshot">
                <h2>Account Snapshot</h2>
                <h4>Account Balance: ${currBalance}</h4>
                <p>
                    Your current balance gives you an overview of your financial health. Use our tools to budget, save, and invest wisely.
                </p>
            </div>

            <div>
                <h2>Get Started</h2>
                <p>
                    Explore our features to manage your finances effectively. From tracking expenses to setting savings goals, we’ve got you covered.
                </p>
                <ul>
                    <li>Track your spending</li>
                    <li>Set up savings goals</li>
                    <li>Generate detailed reports</li>
                </ul>
            </div>
            <div>
                    <h2>Finance Tips</h2>
                    <div>
                        <h3>1. Create a Budget</h3>
                        <p>
                            Start by setting a budget to track your income and expenses. This will help you manage your spending and save for future goals.
                        </p>
                    </div>
                    <div>
                        <h3>2. Save Regularly</h3>
                        <p>
                            Make it a habit to set aside a portion of your income each month. Even small amounts can add up over time.
                        </p>
                    </div>
                    <div>
                        <h3>3. Avoid Unnecessary Debt</h3>
                        <p>
                            Use credit responsibly and avoid taking on debt that you cannot afford to repay. Aim to pay off balances in full each month.
                        </p>
                    </div>
                    <div>
                        <h3>4. Invest Wisely</h3>
                        <p>
                            Explore different investment options and choose those that align with your financial goals and risk tolerance.
                        </p>
                    </div>
                </div>
        </div>
    );
}

export default Home;
