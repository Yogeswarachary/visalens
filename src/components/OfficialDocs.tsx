'use client';
import { Button } from '@/components/ui/button';

interface OfficialDocsProps {
  category: string;
}

export default function OfficialDocs({ category }: OfficialDocsProps) {
  const getOfficialLink = (cat: string): string => {
    const lowerCat = cat.toLowerCase();

    if (lowerCat.includes('us')) {
      return 'https://ustraveldocs.com/in/';
    } else if (lowerCat.includes('uk')) {
      return 'https://www.gov.uk/world/organisations/british-embassy-new-delhi';
    } else if (lowerCat.includes('canada')) {
      return 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html';
    } else if (lowerCat.includes('germany')) {
      return 'https://india.diplo.de/in-en/visa';
    } else if (lowerCat.includes('france')) {
      return 'https://france-visas.gouv.fr/';
    } else if (lowerCat.includes('australia')) {
      return 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder';
    } else if (lowerCat.includes('new zealand')) {
      return 'https://www.immigration.govt.nz/new-zealand-visas';
    } else if (lowerCat.includes('schengen') || lowerCat.includes('italy') || lowerCat.includes('austria') || lowerCat.includes('spain')) {
      return 'https://www.schengenvisainfo.com/';
    } else if (lowerCat.includes('china')) {
      return 'https://www.visaforchina.cn/';
    } else if (lowerCat.includes('japan')) {
      return 'https://www.mofa.go.jp/j_info/visit/visa/index.html';
    } else if (lowerCat.includes('south korea')) {
      return 'https://www.visa.go.kr/';
    } else if (lowerCat.includes('uae')) {
      return 'https://www.dubaivisa.ae/';
    } else if (lowerCat.includes('russia')) {
      return 'https://visa.kdmid.ru/';
    } else if (lowerCat.includes('turkey')) {
      return 'https://www.evisa.gov.tr/';
    } else {
      return 'https://www.google.com/search?q=' + encodeURIComponent(`${cat} visa documents checklist official site`);
    }
  };

  const link = getOfficialLink(category);

  return (
    <Button
      onClick={() => window.open(link, '_blank')}
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      📋 Official Documents
    </Button>
  );
}