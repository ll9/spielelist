import listeneintragClient from './listeneintragClient';
import userClient from './userClient';
import userEntryClient from './userEntryClient';
import archiveClient from './archiveClient';

export default {
    listEintraege: listeneintragClient,
    users: userClient,
    userEntries: userEntryClient,
    archive: archiveClient,
};
