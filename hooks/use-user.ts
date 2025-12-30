import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAge, setEmail, setName, setPhone } from '@/store/slices/userSlice';

export function useUser() {
  const dispatch = useAppDispatch();

  
  return {  
    setName: (name: string) => {
      dispatch(setName(name));
    },
    setAge: (age: number) => {
      dispatch(setAge(age));
    },  
    setEmail: (email: string) => {
      dispatch(setEmail(email));
    },
    setPhone: (phone: string) => {
      dispatch(setPhone(phone));
    },
    name: useAppSelector((state) => state.user.name),
    age: useAppSelector((state) => state.user.age),
    email: useAppSelector((state) => state.user.email),
    phone: useAppSelector((state) => state.user.phone),
  }
}
