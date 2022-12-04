import { Button, Modal } from "antd";
import Text from 'antd/lib/typography/Text';
import Title from "antd/lib/typography/Title";
import * as React from 'react';
import { fetchMembersByOffer } from "../bsportAPI";
import { User } from "../types";

type OModalProps = {
    offer:number,
}
export const OModal = (props: OModalProps) => {
    const [loading, setLoading] = React.useState(true)
    const [members,setMembers] = React.useState<User[]>()
    React.useEffect(() => {
        async function listMembers() {
            const fetchedMembers = await fetchMembersByOffer(props.offer)
            setMembers(fetchedMembers)
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
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
        <Button type="primary" onClick={showModal}>
            Display information
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Title level={4}>
                    Participants
                </Title>
                {!loading && (
                    (members.length !== 0) ? (
                        Object.values(members).map((member, index) => {
                            return (    
                                <Title level={2} key={index}>
                                    {member.name.toLowerCase()}
                                </Title>    
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