import React, {useEffect, useState} from "react";
import Moment from 'moment';

function ReviewsList(props) { 
    
    const [reviews, setReviews] = useState([]);
    
    useEffect(() => {
        getFeedbacks(props.id);
     }, [props.feedback]);
    
    //Return All Feedback on Coach
    function getFeedbacks(coachId) {    
        fetch(`http://localhost:8000/api/feedbacks/${coachId}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((res) => {
            setReviews(res);
        })
        .catch(error => {
            console.log(error);
        });
    }

    var coachReviews;
    if(reviews) {
        coachReviews = reviews.map((review) => {
            return ( 
                <div class="col-lg-12">
                    <div class="previous-rating-content p-4 my-2">
                        <div class="row">
                            <div class="col-sm-10">
                                <h4 class="my-2">{review.client.name_en}</h4>
                                <p class="my-2">{review.comment}</p>
                                <h6 class="my-2">{Moment(review.created_at).format('YYYY-MM-DD HH:mm')}</h6>
                            </div>
                            <div class="col-sm-2">
                                <div class="rating text-center">
                                    <i class="fas fa-star fa-4x">
                                        <span>{review.rate}</span>
                                    </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )});
    } else {
        coachReviews = () => {
            return (
                <p>No Rates Yet</p>
            )};
    }

    return (
        <React.Fragment>
           <section class="rate-and-comment">
                <div class="container">
                    <div class="card mb-5">
                        <div class="card-header">
                            <h5 class="card-title mb-0"><i class="fa fa-star-half-alt"></i> Reviews</h5>
                        </div>
                        <div class="card-body">
                            <div class="previous-rating">
                                <div class="row">
                                    {coachReviews} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ReviewsList;