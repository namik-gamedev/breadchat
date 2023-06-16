import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { StyledBox } from 'src/components/UI/StyledBox';
import { ChatsSkeleton } from 'src/components/UI/skeletons/ChatsSkeleton';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { ChatsList } from './ChatsList';

export interface ChatsProps {}

export const Chats: FC<ChatsProps> = ({}) => {
   const chatsLoaded = useAppSelector((state) => state.global.dataLoad.chats);
   const chats = useAppSelector((state) => state.chats.data);

   const { t } = useTranslation();

   useEffect(() => {
      document.title = t('chats');

      return () => {
         document.title = 'Bread';
      };
   }, []);

   return (
      <Stack component={StyledBox} spacing={1} sx={{ pt: 1, height: 1 }}>
         {chatsLoaded ? (
            <>
               <Stack sx={{ alignItems: 'center' }}>
                  <Typography variant='h5'>
                     <Trans>chats</Trans>
                  </Typography>
               </Stack>

               <Box sx={{ height: 1, overflow: 'auto' }}>
                  <ChatsList chats={chats} />
               </Box>
            </>
         ) : (
            <ChatsSkeleton />
         )}
      </Stack>
   );
};
