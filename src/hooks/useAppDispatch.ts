import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
