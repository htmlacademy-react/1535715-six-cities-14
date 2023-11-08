import classNames from 'classnames';
import { useState, MouseEvent } from 'react';
import { SortType } from '../const';
import { useAppDispatch } from '../hooks';
import { offersSlice } from '../store/slices/offers-slice';

export default function SortingComponent(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [activeSortType, setActiveSortType] = useState(SortType.POPULAR);
  const dispatch = useAppDispatch();


  const handleSortClick = (evt: MouseEvent<HTMLLIElement>) => {
    const sortItem = evt.currentTarget;
    if(sortItem.textContent === activeSortType) {
      return;
    }

    setIsOpened(!isOpened);
    setActiveSortType(sortItem.textContent!);
    dispatch(offersSlice.actions.changeSortingType(sortItem.textContent!));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames(
        'places__options',
        'places__options--custom',
        { 'places__options--opened': isOpened }
      )}
      >
        {Object.values(SortType).map((sort) => (
          <li
            className={classNames(
              'places__option',
              {'places__option--active': sort === activeSortType}
            )}
            tabIndex={0}
            key={sort}
            onClick={handleSortClick}
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>
  );
}
