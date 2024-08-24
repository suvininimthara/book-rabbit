import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import HeroSection from '../components/HeroSection';
import BookCardComponent from '../components/BookCardComponent';
import CategoryCardComponent from '../components/CategoryCardComponent';
import ContributorCardComponent from '../components/ContributorCardComponent';
import FeedbackComponent from '../components/FeedbackComponent';
import Footer from '../components/FooterComponent';
import { Button } from 'react-bootstrap'; // Import the Button component from the appropriate module
import '../App.css';


const HomePage: React.FC = () => {
    return (
        <div>
            <HeaderComponent />
            <HeroSection />

            <section className="container my-5">
                <h3>Recent Book</h3>
                <h6>Recently added books to our library</h6>
            <div className="book-card-container">
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/></div>
            <div className='mx-auto text-center'><Button variant="outline-light" className="ms-2" style={{color:'#1bb39e ', border: '1px solid #1bb39e'}}>Browes All</Button>
            </div>
            </section>
            <section className="container my-5">
                <h4>Top Rated</h4>
                <h6>Top rated books by our users</h6>
            <div className="book-card-container">
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/>
            <BookCardComponent title="Sirith Maldama" imageUrl="bookimage.png" rating={4} reviews={88}/></div>
            <div className='mx-auto text-center'><Button variant="outline-light" className="ms-2" style={{color:'#1bb39e ', border: '1px solid #1bb39e'}}>Browes All</Button>
            </div>
            </section>
            <section className="container my-5">
                <h2>Top Categories</h2>
                <div className="d-flex justify-content-around">
                    <CategoryCardComponent category="Fiction" description="Explore fictional worlds." />
                    <CategoryCardComponent category="Thriller" description="Learn from reality." />
                </div>
            </section>
            <section className="container my-5">
                <h2>Top Categories</h2>
                <div className="d-flex justify-content-around">
                    <ContributorCardComponent name= "Mr. Saman Perera" contribution= "Author" />
                    <ContributorCardComponent name= "Mr. Saman Perera" contribution= "Author" />
                </div>
            </section>
            <section className="container my-5">
                <h2>Customer Feedback</h2>
                <FeedbackComponent feedback="Great platform!" user="User One" />
                <FeedbackComponent feedback="Amazing book selection!" user="User Two" />
            </section>


            <Footer />
            
        </div>

    );
};

export default HomePage;
