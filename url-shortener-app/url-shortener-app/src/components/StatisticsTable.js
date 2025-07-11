import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link as MuiLink,
} from '@mui/material';

function StatisticsTable({ urls }) {
  return (
    <TableContainer component={Paper}> {/* Container for the table */}
      <Table sx={{ minWidth: 650 }} aria-label="shortened URLs statistics table">
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Shortened URL</TableCell>
            <TableCell align="right">Expiry Date</TableCell>
            <TableCell align="right">Clicks</TableCell> {/* Placeholder for clicks */}
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((url) => { // Loop through each URL to display in a row
            // Extract shortcode for client-side redirection
            const shortcode = url.shortUrl.split('/').pop();
            const clientSideShortUrl = `${window.location.origin}/${shortcode}`;

            return (
              // Using 'url.id' or 'url.shortUrl' as a unique key for React list rendering
              <TableRow key={url.id || url.shortUrl}>
                <TableCell component="th" scope="row">
                  <MuiLink href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl}
                  </MuiLink>
                </TableCell>
                <TableCell>
                  <MuiLink href={clientSideShortUrl} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </MuiLink>
                </TableCell>
                <TableCell align="right">
                  {url.expiryDate ? new Date(url.expiryDate).toLocaleString() : 'N/A'}
                </TableCell>
                <TableCell align="right">{url.clicks || 0}</TableCell> {/* Display clicks, default to 0 */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StatisticsTable;