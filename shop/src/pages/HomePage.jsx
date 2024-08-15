import Categories from '../components/Categories/Categories.jsx'
import Slider from '../components/Slider/Slider.jsx'

function HomePage() {
    document.title = "Home"
    return (
        <div>
            <Slider />
            <Categories />
        </div>
    )
}

export default HomePage
