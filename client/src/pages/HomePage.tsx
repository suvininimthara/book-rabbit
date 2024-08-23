import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import BookCardComponent from '../components/BookCardComponent';
import CategoryCardComponent from '../components/CategoryCardComponent';
import ContributorCardComponent from '../components/ContributorCardComponent';
import FeedbackComponent from '../components/FeedbackComponent';
import Footer from '../components/FooterComponent';

const HomePage: React.FC = () => {
    return (
        <div>
            <HeaderComponent />

            <section className="container my-5">
                <h2>Recent Book</h2>
                <div className="d-flex justify-content-around">
                    <BookCardComponent title="Book One" author="Author One" rating={4.5} />
                    <BookCardComponent title="Book Two" author="Author Two" rating={4.0} />
                    <BookCardComponent title="Book Three" author="Author Three" rating={3.5} />
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
