import AddReactionIcon from '@mui/icons-material/AddReaction';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import EmojiPicker, { Categories, EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react';
import React, { FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnchorEl } from 'src/hooks/useAnchorEl';

export interface ChatEmojiPickerProps {
   setMessageText: React.Dispatch<SetStateAction<string>>;
}

export const ChatEmojiPicker: FC<ChatEmojiPickerProps> = ({ setMessageText }) => {
   const { anchorEl, open, handleShow, handleClose } = useAnchorEl();

   const { t } = useTranslation();

   const theme = useTheme();

   const handleEmojiSelect = ({ emoji }: EmojiClickData) => {
      setMessageText((prev) => prev + emoji);
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
                     name: t('recently used'),
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
