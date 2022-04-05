import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred','Send Email', 'Drafts']


export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext( UIContext ); // Seleccionamos el context que necesitamos y desestructuramos la prop necesaria


  return (
    
    <Drawer
        anchor="left"
        open={ sidemenuOpen }
        onClose={ closeSideMenu }
    >
        <Box sx={{ width: 250 }}>
            <Box sx={{ pading: '5px 10px' }}>
                <Typography variant='h4'>Menu</Typography>
            </Box>

            <List>
                { 
                    menuItems.map(( text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

              <List>
                  {
                      menuItems.map((text, index) => (
                          <ListItem button key={text}>
                              <ListItemIcon>
                                  {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                              </ListItemIcon>
                              <ListItemText primary={text} />
                          </ListItem>
                      ))
                  }
              </List> 

        </Box>
    </Drawer>
  )
}
