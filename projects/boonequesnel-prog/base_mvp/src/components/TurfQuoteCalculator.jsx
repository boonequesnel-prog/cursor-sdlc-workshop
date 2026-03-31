import { useMemo, useState } from 'react';
import './TurfQuoteCalculator.css';

function parsePositiveNumber(value, fallback = 0) {
  const n = Number.parseFloat(String(value).replace(/,/g, ''));
  if (!Number.isFinite(n) || n < 0) return fallback;
  return n;
}

function formatMoney(n) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatSqFt(n) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(n);
}

export default function TurfQuoteCalculator() {
  const [areaMode, setAreaMode] = useState('dimensions');
  const [lengthFt, setLengthFt] = useState('40');
  const [widthFt, setWidthFt] = useState('25');
  const [areaSqFtInput, setAreaSqFtInput] = useState('1000');

  const [wastePercent, setWastePercent] = useState('10');
  const [turfPerSqFt, setTurfPerSqFt] = useState('1.85');
  const [laborPerSqFt, setLaborPerSqFt] = useState('0.75');
  const [deliveryFee, setDeliveryFee] = useState('85');

  const [includeLabor, setIncludeLabor] = useState(true);
  const [includeDelivery, setIncludeDelivery] = useState(true);

  const quote = useMemo(() => {
    const L = parsePositiveNumber(lengthFt);
    const W = parsePositiveNumber(widthFt);
    const directArea = parsePositiveNumber(areaSqFtInput);

    const rawArea = areaMode === 'dimensions' ? L * W : directArea;

    const waste = parsePositiveNumber(wastePercent, 0);
    const wasteFactor = 1 + waste / 100;
    const adjustedArea = rawArea * wasteFactor;

    const turfRate = parsePositiveNumber(turfPerSqFt);
    const laborRate = parsePositiveNumber(laborPerSqFt);
    const delivery = parsePositiveNumber(deliveryFee);

    const turfCost = adjustedArea * turfRate;
    const laborCost = includeLabor ? adjustedArea * laborRate : 0;
    const deliveryCost = includeDelivery ? delivery : 0;
    const total = turfCost + laborCost + deliveryCost;

    const invalidDimensions = areaMode === 'dimensions' && (L <= 0 || W <= 0);
    const invalidArea = areaMode === 'area' && directArea <= 0;

    return {
      rawArea,
      adjustedArea,
      wasteFactor,
      turfCost,
      laborCost,
      deliveryCost,
      total,
      invalid: invalidDimensions || invalidArea,
      invalidReason: invalidDimensions
        ? 'Enter length and width greater than zero.'
        : invalidArea
          ? 'Enter total area greater than zero.'
          : null,
    };
  }, [
    areaMode,
    lengthFt,
    widthFt,
    areaSqFtInput,
    wastePercent,
    turfPerSqFt,
    laborPerSqFt,
    deliveryFee,
    includeLabor,
    includeDelivery,
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tqc">
      <div className="tqc-grid">
        <section className="tqc-card" aria-labelledby="inputs-heading">
          <h2 id="inputs-heading" className="tqc-card-title">
            Job inputs
          </h2>

          <fieldset className="tqc-fieldset">
            <legend className="tqc-legend">Lawn size</legend>
            <div className="tqc-segment" role="group" aria-label="How to enter lawn size">
              <button
                type="button"
                className={areaMode === 'dimensions' ? 'is-active' : ''}
                onClick={() => setAreaMode('dimensions')}
              >
                Length × width
              </button>
              <button
                type="button"
                className={areaMode === 'area' ? 'is-active' : ''}
                onClick={() => setAreaMode('area')}
              >
                Total sq ft
              </button>
            </div>

            {areaMode === 'dimensions' ? (
              <div className="tqc-row2">
                <label className="tqc-label">
                  Length (ft)
                  <input
                    className="tqc-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={lengthFt}
                    onChange={(e) => setLengthFt(e.target.value)}
                  />
                </label>
                <label className="tqc-label">
                  Width (ft)
                  <input
                    className="tqc-input"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.1"
                    value={widthFt}
                    onChange={(e) => setWidthFt(e.target.value)}
                  />
                </label>
              </div>
            ) : (
              <label className="tqc-label">
                Area (sq ft)
                <input
                  className="tqc-input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="1"
                  value={areaSqFtInput}
                  onChange={(e) => setAreaSqFtInput(e.target.value)}
                />
              </label>
            )}

            <label className="tqc-label">
              Waste / cuts allowance (%)
              <input
                className="tqc-input"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={wastePercent}
                onChange={(e) => setWastePercent(e.target.value)}
              />
              <span className="tqc-hint">Extra turf for seams, slopes, and trim — often 8–12%.</span>
            </label>
          </fieldset>

          <fieldset className="tqc-fieldset">
            <legend className="tqc-legend">Rates ($)</legend>
            <label className="tqc-label">
              Turf (per sq ft)
              <input
                className="tqc-input"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={turfPerSqFt}
                onChange={(e) => setTurfPerSqFt(e.target.value)}
              />
            </label>
            <label className="tqc-label">
              Installation labor (per sq ft)
              <input
                className="tqc-input"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={laborPerSqFt}
                onChange={(e) => setLaborPerSqFt(e.target.value)}
                disabled={!includeLabor}
              />
            </label>
            <label className="tqc-label">
              Delivery (flat)
              <input
                className="tqc-input"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                disabled={!includeDelivery}
              />
            </label>

            <div className="tqc-toggles">
              <label className="tqc-check">
                <input
                  type="checkbox"
                  checked={includeLabor}
                  onChange={(e) => setIncludeLabor(e.target.checked)}
                />
                Include labor in total
              </label>
              <label className="tqc-check">
                <input
                  type="checkbox"
                  checked={includeDelivery}
                  onChange={(e) => setIncludeDelivery(e.target.checked)}
                />
                Include delivery in total
              </label>
            </div>
          </fieldset>
        </section>

        <section className="tqc-card tqc-card-quote" aria-labelledby="quote-heading">
          <div className="tqc-quote-header">
            <h2 id="quote-heading" className="tqc-card-title">
              Quote
            </h2>
            <button type="button" className="tqc-print" onClick={handlePrint}>
              Print / PDF
            </button>
          </div>

          {quote.invalid ? (
            <p className="tqc-error" role="alert">
              {quote.invalidReason}
            </p>
          ) : (
            <>
              <dl className="tqc-dl">
                <div className="tqc-dl-row">
                  <dt>Measured area</dt>
                  <dd>{formatSqFt(quote.rawArea)} sq ft</dd>
                </div>
                <div className="tqc-dl-row tqc-dl-muted">
                  <dt>
                    With {parsePositiveNumber(wastePercent, 0)}% waste ({formatSqFt(quote.adjustedArea)}{' '}
                    sq ft)
                  </dt>
                  <dd />
                </div>
                <div className="tqc-dl-row">
                  <dt>Turf materials</dt>
                  <dd>{formatMoney(quote.turfCost)}</dd>
                </div>
                {includeLabor ? (
                  <div className="tqc-dl-row">
                    <dt>Installation</dt>
                    <dd>{formatMoney(quote.laborCost)}</dd>
                  </div>
                ) : null}
                {includeDelivery ? (
                  <div className="tqc-dl-row">
                    <dt>Delivery</dt>
                    <dd>{formatMoney(quote.deliveryCost)}</dd>
                  </div>
                ) : null}
                <div className="tqc-dl-total">
                  <dt>Estimated total</dt>
                  <dd>{formatMoney(quote.total)}</dd>
                </div>
              </dl>
              <p className="tqc-disclaimer">
                Indicative estimate only — not a binding bid. Verify measurements and material specs on site.
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
