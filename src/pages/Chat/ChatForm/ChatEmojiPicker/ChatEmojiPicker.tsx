import React, { FC, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import { BrowserView } from 'react-device-detect';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Picker from '@emoji-mart/react';
import emojiMartData from '@emoji-mart/data/sets/14/apple.json';
import { useTheme } from '@mui/material';
import { useAnchorEl } from 'src/hooks/useAnchorEl';
import { useAppSelector } from 'src/hooks/useAppSelector';
import EmojiPicker, { EmojiStyle, Theme, Categories } from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';

export interface ChatEmojiPickerProps {
   setMessageText: React.Dispatch<SetStateAction<string>>;
}

export const ChatEmojiPicker: FC<ChatEmojiPickerProps> = ({ setMessageText }) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const { t } = useTranslation();

   const theme = useTheme();

   const handleEmojiSelect = (emoji: any) => {
      setMessageText((prev) => prev + emoji.native);
   };

   return (
      <Box>
         <IconButton onClick={handleShow}>
            <AddReactionIcon />
         </IconButton>
         <Popover
            open={open}
            anchorEl={anchorEl}
            transformOrigin={{
               horizontal: 'right',
               vertical: 'bottom',
            }}
            anchorOrigin={{
               horizontal: 'left',
               vertical: 'bottom',
            }}
            keepMounted
            onClose={handleClose}
            elevation={3}
         >
            <EmojiPicker
               emojiStyle={EmojiStyle.APPLE}
               categories={[
                  {
                     category: Categories.SUGGESTED,
                     name: t('recently used"'),
                  },
                  {
                     category: Categories.SMILEYS_PEOPLE,
                     name: t('smileys and people'),
                  },
                  {
                     category: Categories.ANIMALS_NATURE,
                     name: t('animals and nature'),
                  },
                  {
                     category: Categories.FOOD_DRINK,
                     name: t('food and drink'),
                  },
                  {
                     category: Categories.TRAVEL_PLACES,
                     name: t('travel and places'),
                  },
                  {
                     category: Categories.ACTIVITIES,
                     name: t('activities'),
                  },
                  {
                     category: Categories.OBJECTS,
                     name: t('objects'),
                  },
                  {
                     category: Categories.SYMBOLS,
                     name: t('symbols'),
                  },
                  {
                     category: Categories.FLAGS,
                     name: t('flags'),
                  },
               ]}
               theme={theme.palette.mode as Theme}
               lazyLoadEmojis
               onEmojiClick={handleEmojiSelect}
            />
         </Popover>
      </Box>
   );
};
