import { Card } from '@components/ui';

export default function BettingFeatured() {
  return (
    <Card>
      <div>
        <h6 className="px-6 py-4">Featured</h6>
        <hr />
      </div>

      <div className="flex items-center gap-4 px-6 py-4">
        <picture>
          <source srcSet="./assets/images/dota.png" type="image/png" />
          <img className="" src="./assets/images/dota.png" alt="Landscape picture" />
        </picture>
        <p>The International 2022: Singapore</p>
      </div>
    </Card>
  );
}
