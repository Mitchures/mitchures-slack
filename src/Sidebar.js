import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import LayersIcon from '@material-ui/icons/Layers';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';
import {db} from "./firebase";
import {useStateValue} from "./StateProvider";

function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    db
      .collection('rooms')
      .orderBy('name', 'desc')
      .onSnapshot(snapshot => (
        setChannels(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
          }))
        )
      ));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>Mitchures Slack</h2>
          <h3>
            <FiberManualRecordIcon/>
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon/>
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
      <SidebarOption Icon={AlternateEmailIcon} title="Mentions & reactions"/>
      <SidebarOption Icon={FileCopyIcon} title="Drafts"/>
      <SidebarOption Icon={BookmarkBorderIcon} title="Saved items"/>
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups"/>
      <SidebarOption Icon={AppsIcon} title="Apps"/>
      <SidebarOption Icon={LayersIcon} title="File browser"/>
      <SidebarOption Icon={ArrowUpwardIcon} title="Show less"/>
      <hr/>
      <SidebarOption Icon={ArrowDownwardIcon} title="Channels"/>
      <hr/>
      <SidebarOption
        Icon={AddIcon}
        title="Add channel"
        addChannelOption
      />
      {channels.map(({id, name}) => (
        <SidebarOption
          key={id}
          id={id}
          title={name}
        />
      ))}
      <hr/>
    </div>
  );
}

export default Sidebar;