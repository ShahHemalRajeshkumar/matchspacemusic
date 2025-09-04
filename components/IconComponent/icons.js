import dynamic from 'next/dynamic';

const ArrowLeft = dynamic(() => import('../icons/ArrowLeft'), { ssr: false });
const ArrowRight = dynamic(() => import('../icons/ArrowRight'), { ssr: false });
const Accordion = dynamic(() => import('../icons/Accordion'), { ssr: false });
const Drums = dynamic(() => import('../icons/Drums'), { ssr: false });
const Flute = dynamic(() => import('../icons/Flute'), { ssr: false });
const Guitar = dynamic(() => import('../icons/Guitar'), { ssr: false });
const Singing = dynamic(() => import('../icons/Singing'), { ssr: false });
const Ukulele = dynamic(() => import('../icons/Ukulele'), { ssr: false });
const Violin = dynamic(() => import('../icons/Violin'), { ssr: false });
const Violoncello = dynamic(() => import('../icons/Violoncello'), { ssr: false });
const Piano = dynamic(() => import('../icons/Piano'), { ssr: false });
const Location2 = dynamic(() => import('../icons/Location2'), { ssr: false });
const Teacher = dynamic(() => import('../icons/Teacher'), { ssr: false });
const ThumbsUp = dynamic(() => import('../icons/ThumbsUp'), { ssr: false });
const CertifiedMusican = dynamic(() => import('../icons/CertifiedMusican'), { ssr: false });
const QualifiedMusician = dynamic(() => import('../icons/QualifiedMusician'), { ssr: false });
const Keyboard = dynamic(() => import('../icons/Keyboard'), { ssr: false });
const Recorder = dynamic(() => import('../icons/Recorder'), { ssr: false });
const ElectricGuitar = dynamic(() => import('../icons/ElectricGuitar'), { ssr: false });
const Blog = dynamic(() => import('../icons/Blog'), { ssr: false });
const Innosuisse = dynamic(() => import('../icons/Innosuisse'), { ssr: false });
const Clarinet = dynamic(() => import('../icons/Clarinet'), { ssr: false });
const TransverseFlute = dynamic(() => import('../icons/TransverseFlute'), { ssr: false });
const Saxophone = dynamic(() => import('../icons/Saxophone'), { ssr: false });
const LocationPink = dynamic(() => import('../icons/LocationPink'), { ssr: false });

export const icons = {
    arrowLeft: ArrowLeft,
    arrowRight: ArrowRight,
    accordion: Accordion,
    drums: Drums,
    flute: Flute,
    singing: Singing,
    ukulele: Ukulele,
    violin: Violin,
    violoncello: Violoncello,
    piano: Piano,
    guitar: Guitar,
    location2: Location2,
    teacher: Teacher,
    thumbsUp: ThumbsUp,
    certifiedMusican: CertifiedMusican,
    qualifiedMusician: QualifiedMusician,
    keyboard: Keyboard,
    recorder: Recorder,
    electricGuitar: ElectricGuitar,
    blog: Blog,
    innosuisse: Innosuisse,
    clarinet: Clarinet,
    transverseFlute: TransverseFlute,
    saxophone: Saxophone,
    locationPink: LocationPink
};
