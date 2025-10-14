# CB Seat Map Component

An Angular library for displaying interactive seat maps for flights.

## Installation

```bash
npm install --save cb-seat-map
```

## Usage as an Angular component

Import the component in your Angular module:

```typescript
import { CbSeatMapComponent } from 'cb-seat-map';

// For standalone components
@Component({
  standalone: true,
  imports: [CbSeatMapComponent]
})
```

Then use it in your template:

```html
<cb-seat-map
  [data]="seatMap"
  img="AirbusA320.svg"
  legend="true"
  preview="false"
  rotation="vertical"
  (selectedSeats)="onSelectedSeats($event)"
  selection="true"
  svgheight="500px"
  svgwidth="500px"
/>
```

## Usage as a web component

```typescript

```

## Components

The library includes the following components:

- `CbSeatMapComponent` - Main component for rendering the seat map
- `CbSeatMapLegendComponent` - Main component for rendering the legend
- `CbSeatMapSectionComponent` - Component for rendering a section of seats
- `CbSeatMapTravelerPanelComponent` - Component for managing traveler seat selection
- `CbSeatsComponent` - Component for rendering individual seats

## Development

### Running Storybook

To run Storybook locally for development and testing:

```bash
npm run storybook
```

This will start Storybook on http://localhost:6006.

### Building the library

```bash
npm run build
```

### Building Storybook (static version)

```bash
npm run build-storybook
```

This creates a static version of Storybook in the `storybook-static` directory.

## Dependencies

- Angular ≥ 17.0
- jb-component-library (JetBlue component library)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request
