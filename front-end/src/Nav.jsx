import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./styles/nav.css"
export default function Nav(props){

    const {t, i18n } = useTranslation();
    return (
        <nav>
            <div>
                {t("expenses")}
            </div>

            <div>
                {props.links.map(link => (
                    <Link to={link.path}>{link.name}</Link>
                ))}
            </div>

            <div>
                <div>
                    <input type="checkbox" id="lang-switch" class="lang-checkbox"/>

                    
                    <label for="lang-switch" class="lang-label">
                        <span class="lang-en">EN</span>
                        <span class="lang-ball"></span>
                        <span class="lang-ar">ES</span>
                    </label>
                </div>

                <div>

                </div>
            </div>

        </nav>
    )
}