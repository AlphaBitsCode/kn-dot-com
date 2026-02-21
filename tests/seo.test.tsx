import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import SandBatteryExperiment from '../src/pages/SandBatteryExperiment';
import SandBatteryPatent from '../src/pages/SandBatteryPatent';
import { MemoryRouter } from 'react-router-dom';

describe('SEO Meta Tag Injections', () => {

    // Helper to render pages within router contexts since they use routing links
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<MemoryRouter>{ui}</MemoryRouter>);
    };

    beforeEach(() => {
        // Clear DOM head to provide a blank slate for each test
        document.head.innerHTML = '';

        // Setup initial generic tags representing index.html state before React mounting
        const desc = document.createElement('meta');
        desc.name = 'description';
        desc.content = 'Generic Site Description';
        document.head.appendChild(desc);

        const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Generic Site Title';
        document.head.appendChild(ogTitle);
    });

    afterEach(() => {
        document.head.innerHTML = '';
    });

    it('should inject correct SEO tags on the Sand Battery Experiment page', async () => {
        renderWithRouter(<SandBatteryExperiment />);

        await waitFor(() => {
            // Document Title
            expect(document.title).toBe('Interactive Sand Battery | Kent Nguyen');

            // Find manipulated tags
            const descTag = document.querySelector('meta[name="description"]');
            const keywordsTag = document.querySelector('meta[name="keywords"]');
            const ogTitleTag = document.querySelector('meta[property="og:title"]');
            const ogDescTag = document.querySelector('meta[property="og:description"]');
            const ogImageTag = document.querySelector('meta[property="og:image"]');

            // Assert they exist
            expect(descTag).toBeInTheDocument();
            expect(keywordsTag).toBeInTheDocument();
            expect(ogTitleTag).toBeInTheDocument();
            expect(ogDescTag).toBeInTheDocument();
            expect(ogImageTag).toBeInTheDocument();

            // Assert exact specific content exists, replacing the generic tag defaults
            expect(descTag?.getAttribute('content')).toContain('Interactive thermodynamic simulation of the Sand Battery');
            expect(keywordsTag?.getAttribute('content')).toContain('patent 12130086');
            expect(ogTitleTag?.getAttribute('content')).toBe('Interactive Sand Battery Simulation');
            expect(ogDescTag?.getAttribute('content')).toContain('discharge hot air at 200°C');
            expect(ogImageTag?.getAttribute('content')).toBe('https://www.kentnguyen.com/images/sb/IMG_20231127_164139.jpg');
        });
    });

    it('should inject correct SEO tags on the Sand Battery Patent page', async () => {
        renderWithRouter(<SandBatteryPatent />);

        await waitFor(() => {
            expect(document.title).toBe('Sand Battery Patent Download | Kent Nguyen');

            const descTag = document.querySelector('meta[name="description"]');
            const ogTitleTag = document.querySelector('meta[property="og:title"]');
            const ogImageTag = document.querySelector('meta[property="og:image"]');

            expect(descTag?.getAttribute('content')).toContain('Download USPTO Patent No. 12,130,086 B1');
            expect(ogTitleTag?.getAttribute('content')).toBe('Sand Battery Patent Download');
            expect(ogImageTag?.getAttribute('content')).toBe('https://www.kentnguyen.com/images/sand_battery_uspto.jpg');
        });
    });
});
