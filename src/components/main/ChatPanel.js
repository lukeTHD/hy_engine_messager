import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Badge,Button,Container, Content, Icon,List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {updateDialogUnread} from '../../actions/DialogAction';
class ChatPanel extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }

    render() {
        const {navigation,dialogReducer,updateDialogUnreadCount} = this.props;
        return (
            <Container>
                <Content>
                    <List>
                        {dialogReducer.dialogs.map((dialog,index)=>{
                            return (
                                <ListItem avatar key={index}
                                          onPress={() => {
                                              navigation.navigate('chatItemScreen',{title:dialog.name,dialog:dialog});
                                              updateDialogUnreadCount(dialog);
                                          }}>
                                    <Left>
                                        <Thumbnail source={{ uri: dialog.photo }} />
                                    </Left>
                                    <Body>
                                    <Text>{dialog.dialogId}</Text>
                                    <Text note numberOfLines={2}>{dialog.lastMessage}</Text>
                                    <Text note></Text>
                                    </Body>
                                    <Right>
                                        <Text note>{new Date(dialog.lastMessageDateSent).toLocaleString()}</Text>
                                        {
                                            dialog.unreadMessagesCount>0 &&
                                            <Badge danger>
                                                <Text>{dialog.unreadMessagesCount}</Text>
                                            </Badge>
                                        }
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dialogReducer: state.DialogReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    updateDialogUnreadCount: (dialog) => {
        dispatch(updateDialogUnread(dialog))
    }
})
export default connect(mapStateToProps, mapDispatchProps)(ChatPanel)
