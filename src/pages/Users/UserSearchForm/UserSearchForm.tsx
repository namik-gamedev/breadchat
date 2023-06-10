import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { Trans, useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { IUser } from 'src/types/types';

export interface UserSearchFormProps {
   setFilteredUsers: Dispatch<SetStateAction<IUser[]>>;
}

export enum SearchBy {
   NAME,
   ID,
}

export const UserSearchForm: FC<UserSearchFormProps> = ({ setFilteredUsers }) => {
   const users = useAppSelector((state) => state.users.data);
   const dispatch = useAppDispatch();

   const [searchQuery, setSearchQuery] = useState('');
   const [searchBy, setSearchBy] = useState(SearchBy.NAME);

   const { t } = useTranslation();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value.trimStart().trimEnd().toLowerCase();

      setSearchQuery(newQuery);
   };

   const handleSearchByChange = (e: SelectChangeEvent<SearchBy>) => {
      setSearchBy(e.target.value as SearchBy);
   };

   useEffect(() => {
      const newQuery = searchQuery.toLowerCase().trimStart().trimEnd();
      const newUsers: IUser[] = users.filter((user) => {
         if (!user.displayName || !user.uid) {
            return false;
         }
         if (searchBy === SearchBy.NAME) {
            return user.displayName.toLowerCase().includes(newQuery);
         } else {
            return user.uid.toLowerCase().includes(newQuery);
         }
      });

      setFilteredUsers(newUsers);
   }, [users, searchQuery, searchBy]);

   return (
      <Stack direction='row' spacing={1} sx={{ px: 1 }} component='form'>
         <TextField onChange={handleChange} sx={{ width: 1 / 2 }} label={t('search user')} />

         <FormControl sx={{ width: 1 / 2 }}>
            <InputLabel id='search-by-label-id'>
               <Trans>search by</Trans>
            </InputLabel>
            <Select onChange={handleSearchByChange} label={t('search by')} labelId='search-by-label-id' value={searchBy}>
               <MenuItem value={SearchBy.NAME}>
                  <Trans>by name</Trans>
               </MenuItem>
               <MenuItem value={SearchBy.ID}>
                  <Trans>by id</Trans>
               </MenuItem>
            </Select>
         </FormControl>
      </Stack>
   );
};
