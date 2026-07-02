import {Generate} from '../blocks/generate/generate';
import {Terminate} from '../blocks/terminate/terminate';
import {Advance} from '../blocks/advance/advance';
import {Queue} from '../blocks/queue/queue';
import {Depart} from '../blocks/depart/depart';
import {Seize} from '../blocks/seize/seize';
import {Release} from '../blocks/release/release';
import {Enter} from '../blocks/enter/enter';
import {Leave} from '../blocks/leave/leave';
import {Transfer} from '../blocks/transfer/transfer';
import {Mark} from '../blocks/mark/mark';
import {Priority} from '../blocks/priority/priority';
import {Assign} from '../blocks/assign/assign';
import {Select} from '../blocks/select/select';
import {Test} from '../blocks/test/test';
import {Split} from '../blocks/split/split';
import {Match} from '../blocks/match/match';
import {Assemble} from '../blocks/assemble/assemble';
import {Gather} from '../blocks/gather/gather';
import {SaveValue} from '../blocks/savevalue/saveValue';
import {Label} from '../blocks/label/label';
import {Text} from '../blocks/text/text';
import type {AbstractBlock} from '../blocks/abstractBlock';

type BlockConstructor = new (params: string[]) => AbstractBlock;

export const gpssBlocks: Record<string, BlockConstructor>  = {
	GENERATE: Generate,
	TERMINATE: Terminate,
	ADVANCE: Advance,
	QUEUE: Queue,
	DEPART: Depart,
	SEIZE: Seize,
	RELEASE: Release,
	ENTER: Enter,
	LEAVE: Leave,
	TRANSFER: Transfer,
	MARK: Mark,
	PRIORITY: Priority,
	ASSIGN: Assign,
	SELECT: Select,
	TEST: Test,
	SPLIT: Split,
	MATCH: Match,
	ASSEMBLE: Assemble,
	GATHER: Gather,
	SAVEVALUE: SaveValue,
	LABEL: Label,
	TEXT: Text,
}