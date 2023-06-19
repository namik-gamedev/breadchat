import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { Dispatch, FC, SetStateAction } from 'react';
import { Trans } from 'react-i18next';
import { IAuthTab } from 'src/types/types';

interface Props {
   setTab: Dispatch<SetStateAction<IAuthTab>>;
}

const tabSx: SxProps = { fontSize: '1.2em', fontWeight: 500 };

export const AuthTabList: FC<Props> = ({ setTab }) => {
   const handleTabChange = (_e: any, tab: IAuthTab) => {
      setTab(tab);
   };

   return (
      <TabList selectionFollowsFocus onChange={handleTabChange}>
         <Tab
            label={
               <Typography sx={tabSx}>
                  <Trans>sign in</Trans>
               </Typography>
            }
            value='signIn'
         />
         <Tab
            label={
               <Typography sx={tabSx}>
                  <Trans>sign up</Trans>
               </Typography>
            }
            value='signUp'
         />
      </TabList>
   );
};
