import styled from "@emotion/styled";
import React, { ReactElement, useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";

const TabGroup = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const TabNameGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
`;
type TabNameProps = {
    isActive: boolean;
};
const TabName = styled(Button)<TabNameProps>`
    cursor: pointer;
    opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
    font-size: 1rem;
    padding: 1rem 2rem;
`;

const TabContent = styled.div`
    padding: 2rem;
`;
type TabChildrenProps = { label: string; tabName: string };

type Props = {
    children: ReactElement<TabChildrenProps>[];
};

const Tabs: React.FC<Props> = ({ children }) => {
    const [tabActive, setTabActive] = useState(children[0].props.label);

    const handleTabActive = useCallback(
        (label: string) => setTabActive(label),
        []
    );

    const tabs = children.map(child => {
        return (
            <TabName
                key={child.props.label}
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    handleTabActive(child.props.label);
                }}
                isActive={child.props.label === tabActive}
            >
                {child.props.tabName}
            </TabName>
        );
    });

    const tabContent = children.filter(
        child => child.props.label === tabActive
    );

    return (
        <>
            <TabGroup>
                <TabNameGroup>{tabs}</TabNameGroup>
                <TabContent>{tabContent}</TabContent>
            </TabGroup>
        </>
    );
};

const Tab: React.FC<TabChildrenProps> = props => {
    return <>{props.children}</>;
};

export { Tabs, Tab };
