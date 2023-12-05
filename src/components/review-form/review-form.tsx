import CommentType from '../../types/comment';
import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from '../../const';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchCommentAction } from '../../store/api-actions';

const RatingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
};

export default function ReviewFormComponent(): JSX.Element {
  const offerId = String(useParams().offerId);
  const dispatch = useAppDispatch();
  const [commentValue, setCommentValue] = useState('');
  const [ratingValue, setRatingValue] = useState('');
  const [isDisabled, setDisableStatus] = useState(false);
  const isValid =
    commentValue.length >= COMMENT_MIN_LENGTH &&
    commentValue.length <= COMMENT_MAX_LENGTH &&
    ratingValue !== '';

  function handleTextChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setCommentValue(evt.target.value);
  }

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRatingValue(evt.target.value);
  }

  function resetForm() {
    setCommentValue('');
    setRatingValue('');
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    setDisableStatus(true);

    const review: CommentType = {
      offerId,
      rating: Number(ratingValue),
      comment: commentValue
    };

    dispatch(fetchCommentAction(review)).unwrap()
      .then(() => {
        resetForm();
      })
      .catch(() => { })
      .finally(() => setDisableStatus(false));
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(RatingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                onChange={handleRatingChange}
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                checked={score === ratingValue}
                type="radio"
                disabled={isDisabled}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
                data-testid='star-item'
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea onChange={handleTextChange} value={commentValue} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" disabled={isDisabled}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{COMMENT_MIN_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isDisabled}>Submit</button>
      </div>
    </form>
  );
}
