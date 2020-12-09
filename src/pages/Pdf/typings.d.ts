interface InfoRowProps {
    name: string;
}

interface LabelProps {
    name: string;
    value: string;
}
interface InfoSubSectionProps {
    title: string;
    data: { id: string, name: string, value: string}[];
}