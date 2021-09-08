import React from 'react'
import './styles.css'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useHistory } from 'react-router';
import { strings } from '../localization/localization';

const state = {
    responsive: {
        0: {
            items: 1,
        },
        450: {
            items: 2,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
}
function ExploreCate() {

    const history = useHistory();

    return (
        <div className="owl-section">
            <OwlCarousel
                className="owl-theme"
                loop margin={10} nav
                autoplay={true}
                items={5}
                autoplayTimeout={3000}
                dots={false}
                responsive={state.responsive}
            >
                <div class="item">
                    <div className="category-type" onClick={() => history.push("/freelan_service/backend_development")}>
                        <p>BackEnd Development</p>
                    </div>
                    <img src="./assets/popular/p1.jpg" width="60" alt="owl" height="300" />
                </div>
                <div class="item">
                    <div className="category-type" onClick={() => history.push("/freelan_service/web_development")}>
                        <p>Web & Mobile Design</p>
                    </div>
                    <img src="./assets/popular/p2.jpg" width="60" alt="owl" height="300" />
                </div>
                <div class="item">
                    <div className="category-type" onClick={() => history.push("/freelan_service/game_design")}>
                        <p>Game Design</p>
                    </div>
                    <img src="./assets/popular/p3.jpg" width="60" alt="owl" height="300" />
                </div>
                <div class="item">
                    <div className="category-type" onClick={() => history.push("/freelan_service/logo_design")}>
                        <p>Logo Design</p>
                    </div>
                    <img src="./assets/popular/p4.jpg" width="60" alt="owl" height="300" />
                </div>
                <div class="item">
                    <div className="category-type" onClick={() => history.push("/freelan_service/application_development")}>
                        <p>Android Application Developement</p>
                    </div>
                    <img src="./assets/popular/p5.jpg" width="60" alt="owl" height="300" />
                </div>
                <div class="item">
                    <div className="category-type"  onClick={() => history.push("/freelan_service/all")}>
                        <p>{strings.all}</p>
                    </div>
                    <img src="./assets/popular/p6.jpg" width="60" height="300" />
                </div>
            </OwlCarousel>
        </div>
    )
}

export default ExploreCate
