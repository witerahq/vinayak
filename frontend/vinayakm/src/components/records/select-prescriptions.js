import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrescriptions } from '../../actions/prescriptionActions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectPlaceholder({ changePrescription,selectedValue }) {

    const dispatch = useDispatch();
    const prescriptionFromStore = useSelector((state) => {
        console.log(state, 'state')
        return state.prescription.prescriptions
    })
    const [prescription, setPrescription] = React.useState(prescriptionFromStore || {}); // Local state for prescriptions

    // Fetch prescriptions when the component mounts
    React.useEffect(() => {
        console.log('hi')
        console.log(prescription, 'prescription')
        if (!prescriptionFromStore) {

            dispatch(fetchPrescriptions());
        }
    }, [prescriptionFromStore]);

    const theme = useTheme();
    const [personName, setPersonName] = React.useState(selectedValue||[]);
    const [selectedPrescriptionIds, setSelectedPrescriptionIds] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const selectedNames = typeof value === 'string' ? value.split(',') : value;
        setPersonName(selectedNames);

        console.log(prescription,'inside',prescriptionFromStore)
        // Find and store the selected prescription IDs based on the selected names
        const selectedIds = prescription
            .filter((item) => selectedNames.includes(item.name))

        setSelectedPrescriptionIds(selectedIds);
        changePrescription(selectedIds)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                    fullWidth
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Select prescription</em>;
                        }

                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em>Placeholder</em>
                    </MenuItem>
                    {prescription.length && prescription.map((item) => (
                        <MenuItem
                            key={item._id}
                            value={item.name}
                            data-value={item._id}
                            style={getStyles(item._id, personName, theme)}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
