"use client";

export function AnalyticsScript({ token }: { token: string }) {
  return (
    <script
      src="https://beamanalytics.b-cdn.net/beam.min.js"
      data-token={token}
      async
    />
  );
}