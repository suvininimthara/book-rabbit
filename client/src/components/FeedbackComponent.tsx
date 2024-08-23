import React from 'react';

interface FeedbackProps {
    feedback: string;
    user: string;
}

const FeedbackComponent: React.FC<FeedbackProps> = ({ feedback, user }) => {
    return (
        <div className="card p-3">
            <p>"{feedback}"</p>
            <p>- {user}</p>
        </div>
    );
};

export default FeedbackComponent;
