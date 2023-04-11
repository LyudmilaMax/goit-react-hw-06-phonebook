import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filterSlice';
import { Input } from './Filter.styled';

export function Filter() {
  const filter = useSelector(state => state.filters);

  const dispatch = useDispatch();

  const setFilter = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  return (
    <label>
      <Input
        type="text"
        placeholder="Find contacts by name"
        value={filter}
        onChange={setFilter}
      />
    </label>
  );
}
