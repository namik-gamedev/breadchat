import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
import { IUser, SearchBy, UsersShowType } from 'src/types/types';
import { useUsersContext } from 'src/hooks/useUsersContext';

export interface UserSearchFormProps {}

export const UserSearchForm: FC<UserSearchFormProps> = ({}) => {
   const { setFilteredUsers, searchQuery, setSearchQuery, usersShowType, setUsersShowType } = useUsersContext();

   const user = useAppSelector((state) => state.user.data)!;

   const users = useAppSelector((state) => state.users.data);
   const dispatch = useAppDispatch();

   const [searchBy, setSearchBy] = useState(SearchBy.NAME);

   const { t } = useTranslation();

   const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value.trimStart().trimEnd().toLowerCase();

      setSearchQuery(newQuery);
   };

   const handleSearchByChange = (e: SelectChangeEvent<SearchBy>) => {
      setSearchBy(e.target.value as SearchBy);
   };

   const handleUsersShowChange = (e: SelectChangeEvent<UsersShowType>) => {
      setUsersShowType(e.target.value as UsersShowType);
   };

   useEffect(() => {
      const newQuery = searchQuery.toLowerCase().trimStart().trimEnd();
      let newUsers: IUser[] = users.filter((u) => !(u.uid === user.uid));

      if (usersShowType === UsersShowType.ONLINE) {
         newUsers = newUsers.filter((u) => u.online);
      }

      newUsers = newUsers.filter((u) => {
         // todo: убрать эту проверку после очистки БД
         if (!u.displayName || !u.uid) {
            return false;
         }

         if (searchBy === SearchBy.NAME) {
            return u.displayName.toLowerCase().includes(newQuery);
         } else {
            return u.uid.toLowerCase().includes(newQuery);
         }
      });

      setFilteredUsers(newUsers);
   }, [users, searchQuery, searchBy, usersShowType]);

   return (
      <Grid container spacing={1} sx={{ pr: 1, width: 1 }} component='form'>
         <Grid item xs={12} sm>
            <TextField fullWidth onChange={handleSearchQueryChange} label={t('search user')} />
         </Grid>

         <Grid item xs sm>
            <FormControl fullWidth>
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
         </Grid>

         <Grid item xs sm>
            <FormControl fullWidth>
               <InputLabel id='show-label-id'>
                  <Trans>show</Trans>
               </InputLabel>

               <Select value={usersShowType} label={t('show')} labelId='show-label-id' onChange={handleUsersShowChange}>
                  <MenuItem value={UsersShowType.ONLINE}>
                     <Trans>online</Trans>
                  </MenuItem>
                  <MenuItem value={UsersShowType.ALL}>
                     <Trans>all</Trans>
                  </MenuItem>
               </Select>
            </FormControl>
         </Grid>
      </Grid>
   );
};
