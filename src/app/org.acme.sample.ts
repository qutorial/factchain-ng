import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.sample{
   export class NewsItem extends Asset {
      newsItemId: string;
      author: NewsAgency;
      voters: NewsAgency[];
      references: NewsItem[];
      title: string;
      votes: number;
      contentUrl: string;
      contentHash: string;
      timestamp: Date;
   }
   export class NewsAgency extends Participant {
      agencyId: string;
      name: string;
      info: string;
   }
   export class VoteTransaction extends Transaction {
      newsItem: NewsItem;
      origin: NewsAgency;
      score: number;
   }
   export class VoteEvent extends Event {
      newsItem: NewsItem;
      oldScore: number;
      newScore: number;
   }
// }
