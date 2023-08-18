import PropTypes from 'prop-types';

import { Fragment } from 'react';

// third party
import { TreeNode } from 'react-organizational-chart';

// project imports
import DataCard from './DataCard';
import OrganizationIcon from './OrganizationIcon';

// ==============================|| CARD ORGANIZATION CHART ||============================== //

function Card({ items , data}) {
    return (
        <>
            {items.map((item, id) => (
                <Fragment key={id}>
                    {item.children ? (
                        <TreeNode
                            label={
                                <DataCard
                                    name={item.name}
                                    role={item.role}
                                    id={item.id}
                                    linkedin={item.linkedin}
                                    meet={item.meet}
                                    skype={item.skype}
                                    root={false}
                                    item={item}
                                />
                            }
                        >
                            <Card items={item.children} />
                        </TreeNode>
                    ) : (
                        <TreeNode
                            label={
                                <DataCard
                                    name={item.name}
                                    role={item.role}
                                    id={item.id}
                                    linkedin={item.linkedin}
                                    meet={item.meet}
                                    skype={item.skype}
                                    root={false}
                                    item={item}
                                />
                            }
                        />
                    )}
                </Fragment>
            ))}
        </>
    );
}

Card.propTypes = {
    items: PropTypes.array
};

export default Card;
