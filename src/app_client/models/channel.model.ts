export class ChannelModel {
    // _id: string;
    channelType: string;
    clientEmail: string;
    channelName: string;
    channelLanguage: string;
    channelCategory: string;
    clientInterestingNow: boolean;

    constructor(
        clientEmail: string,
        channelName: string,
        channelLanguage: string,
        channelCategory: string,
        clientInterestingNow: boolean
    ) {
        this.clientEmail = clientEmail;
        this.channelName = channelName;
        this.channelLanguage = channelLanguage;
        this.channelCategory = channelCategory;
        if (clientInterestingNow == true) {
            this.clientInterestingNow = true;
        } else {
            // null
            this.clientInterestingNow = false;
        }
        // in default = false, si es true ejecutará algo en el servidor
        this.channelType = 'YOUTUBE'; // default for this landing page
    }
}
