import MainIssues from "../mainIssues"

export default function ReporterByMe() {

    const idUser = 1;

    const url = 'https://localhost:7112/GetDataReportedByMe/' + idUser
    
    return (
        <MainIssues url={url} />
    )
}