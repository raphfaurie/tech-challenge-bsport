import { Button, Modal } from "antd";
import Text from 'antd/lib/typography/Text';
import Title from "antd/lib/typography/Title";
import * as React from 'react';
import { fetchMembersByOffer } from "../service/bsportAPI";
import { User } from "../types";

type OModalProps = {
    offer:number,
}
export const OModal = (props: OModalProps) => {
    const [loading, setLoading] = React.useState(true)
    const [members,setMembers] = React.useState<User[]>()
    React.useEffect(() => {
        // Lists the lesson participants and their full name.
        async function listMembers() {
            try {
                const fetchedMembers = await fetchMembersByOffer(props.offer)
                setMembers(fetchedMembers)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
            
        }

        if (loading && props.offer) {
            listMembers()
        }
    })
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
        <Button type="primary" onClick={showModal}>
            Display information
            </Button>
            <Modal title="Lesson information" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Title level={4}>
                    Participants
                </Title>
                {!loading && (
                    (members.length !== 0) ? (
                        Object.values(members).map((member, index) => {
                            return (    
                                <Text key={index}>
                                    {member.name.toLowerCase()} <br></br>
                                </Text>    
                                )
                            })
                        ) :
                        <Text>
                            No participant yet.
                        </Text>
            )}
        </Modal>
        </div>
    )

}