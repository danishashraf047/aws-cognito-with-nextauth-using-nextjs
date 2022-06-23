import type { NextPage } from 'next'
import TopBarComponent from './components/top-bar';

const StudentPage: NextPage = () => {
    const type = "Student";

    return (
        <div>
            <TopBarComponent type={type}></TopBarComponent>
        </div>
    )
}

export default StudentPage;