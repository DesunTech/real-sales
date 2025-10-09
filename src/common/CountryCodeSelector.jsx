import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  ClickAwayListener,
  ButtonBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { countries, searchCountries, getCountryByDialCode } from '../utils/countryData';

const CountryCodeSelector = ({ value, onChange, label = "Country Code", color = "#000000" }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Initialize selected country based on value
  useEffect(() => {
    if (value) {
      const country = getCountryByDialCode(`+${value}`);
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [value]);

  // Filter countries based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = searchCountries(searchQuery);
      setFilteredCountries(filtered);
    }
  }, [searchQuery]);

  const handleOpen = () => {
    setOpen(true);
    setSearchQuery('');
    setFilteredCountries(countries);
    // Focus search input after a short delay to ensure it's rendered
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const handleMouseEnter = () => {
    // Only enable hover behavior on desktop (non-touch devices)
    if (!open && window.innerWidth > 768) {
      setOpen(true);
      setSearchQuery('');
      setFilteredCountries(countries);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSearchQuery('');
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onChange(country.dialCode.replace('+', ''));
    handleClose();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open]);

  // Prevent closing on mobile when touching the dropdown
  const handleTouchStart = (event) => {
    event.stopPropagation();
  };

  const displayValue = selectedCountry 
    ? `${selectedCountry.flag} ${selectedCountry.dialCode}` 
    : '';

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <FormControl variant="standard" className="w-[15%]" color={color}>
        <InputLabel id="country-code-label" sx={{ display: 'none' }}>{label}</InputLabel>
        <Box 
          position="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            // Only close on hover leave for desktop
            if (window.innerWidth > 768) {
              setTimeout(() => {
                if (!dropdownRef.current?.matches(':hover')) {
                  handleClose();
                }
              }, 100);
            }
          }}
        >
          <ButtonBase
            onClick={handleOpen}
            onMouseEnter={handleMouseEnter}
            sx={{
              width: '100%',
              minHeight: '56px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
              padding: '8px 12px',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'left',
              marginTop: '-12px', // Move the divider down to align with phone number field
              '&:hover': {
                borderBottomColor: 'rgba(0, 0, 0, 0.87)',
              },
              '&:focus': {
                borderBottomColor: color,
                borderBottomWidth: '2px',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1} sx={{ 
              paddingLeft: '2px', 
              paddingTop: '19px',
              '@media (max-width: 768px)': {
                paddingLeft: '2px',
                marginLeft: '-8px', // Move left on mobile only
              }
            }}>
              {selectedCountry ? (
                <Typography variant="body2">{selectedCountry.dialCode}</Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Select country
                </Typography>
              )}
            </Box>
            <KeyboardArrowDownIcon 
              sx={{ 
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out',
                color: 'rgba(0, 0, 0, 0.54)',
                marginTop: '19px', // Move the dropdown icon down
                '@media (max-width: 768px)': {
                  marginLeft: '-4px', // Move left on mobile only
                }
              }} 
            />
          </ButtonBase>
          
          {open && (
            <Paper 
              ref={dropdownRef}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => {
                // Only close on hover leave for desktop
                if (window.innerWidth > 768) {
                  setTimeout(() => {
                    handleClose();
                  }, 100);
                }
              }}
              onTouchStart={handleTouchStart}
              sx={{ 
                position: 'absolute',
                top: '100%',
                left: '8px', // Align with the shifted content
                width: '300px', // Fixed width instead of right: 0
                zIndex: 1300,
                maxHeight: 300,
                overflow: 'hidden',
                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                '@media (max-width: 768px)': {
                  left: '0px', // Move dropdown left on mobile only
                }
              }}
            >
              <Box sx={{ p: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                <TextField
                  ref={searchInputRef}
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '14px',
                    },
                  }}
                />
              </Box>
              
              <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                <List dense>
                  {filteredCountries.map((country) => (
                    <ListItem
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      onTouchStart={handleTouchStart}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                        py: 0.5,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <span style={{ fontSize: '16px' }}>{country.flag}</span>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {country.dialCode}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {country.name}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          )}
        </Box>
      </FormControl>
    </ClickAwayListener>
  );
};

export default CountryCodeSelector;